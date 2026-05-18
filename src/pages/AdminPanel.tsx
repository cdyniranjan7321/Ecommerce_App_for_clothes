import { useState, useEffect } from "react";
import { supabase } from "@/integrations_supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Package, Plus, Edit, Trash2, LayoutDashboard, LogOut, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Database } from "@/integrations_supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

const AdminPanel = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "dashboard">("dashboard");

  // Form state
  const [formData, setFormData] = useState<ProductInsert>({
    name: "",
    description: "",
    price: 0,
    original_price: null,
    category: "Women",
    image_url: "",
    is_new: false,
    is_featured: false,
    sizes: [],
    colors: [],
    stock: 0,
  });

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoadingProducts(false);
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="font-body text-muted-foreground">Loading...</p></div>;
  }
  if (!user) return <Navigate to="/auth" />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">Access Denied</h1>
          <p className="font-body text-muted-foreground mb-6">You don't have admin privileges.</p>
          <Link to="/"><Button variant="outline" className="rounded-sm">Back to Store</Button></Link>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", price: 0, original_price: null, category: "Women", image_url: "", is_new: false, is_featured: false, sizes: [], colors: [], stock: 0 });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!formData.name) { toast.error("Product name is required"); return; }
    if (editingProduct) {
      const { error } = await supabase.from("products").update(formData).eq("id", editingProduct.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Product updated!");
    } else {
      const { error } = await supabase.from("products").insert(formData);
      if (error) { toast.error(error.message); return; }
      toast.success("Product created!");
    }
    resetForm();
    fetchProducts();
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      description: p.description,
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : null,
      category: p.category,
      image_url: p.image_url,
      is_new: p.is_new,
      is_featured: p.is_featured,
      sizes: p.sizes || [],
      colors: p.colors || [],
      stock: p.stock,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Product deleted");
    fetchProducts();
  };

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-foreground text-primary-foreground min-h-screen">
        <div className="p-6 border-b border-primary-foreground/10">
          <h2 className="font-heading text-xl font-semibold">MAISON</h2>
          <p className="font-body text-xs text-primary-foreground/50 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm transition-colors ${activeTab === "dashboard" ? "bg-primary-foreground/10" : "hover:bg-primary-foreground/5"}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button onClick={() => setActiveTab("products")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm transition-colors ${activeTab === "products" ? "bg-primary-foreground/10" : "hover:bg-primary-foreground/5"}`}>
            <Package size={18} /> Products
          </button>
        </nav>
        <div className="p-4 border-t border-primary-foreground/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 font-body text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <Home size={16} /> Back to Store
          </Link>
          <button onClick={signOut} className="flex items-center gap-3 px-4 py-2 font-body text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors w-full">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Admin</h2>
          <div className="flex gap-2">
            <Button variant={activeTab === "dashboard" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("dashboard")} className="rounded-sm text-xs">Dashboard</Button>
            <Button variant={activeTab === "products" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("products")} className="rounded-sm text-xs">Products</Button>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Products", value: products.length, icon: Package },
                { label: "Total Stock", value: totalStock, icon: Users },
                { label: "Categories", value: categories.length, icon: LayoutDashboard },
                { label: "Featured", value: products.filter(p => p.is_featured).length, icon: Edit },
              ].map(stat => (
                <div key={stat.label} className="bg-card border border-border rounded-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={20} className="text-accent" />
                  </div>
                  <p className="font-heading text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Recent Products</h3>
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Product</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Category</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Price</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map(p => (
                      <tr key={p.id} className="border-b border-border last:border-0">
                        <td className="p-4 font-body text-sm text-foreground">{p.name}</td>
                        <td className="p-4 font-body text-sm text-muted-foreground">{p.category}</td>
                        <td className="p-4 font-body text-sm text-foreground">${Number(p.price).toFixed(2)}</td>
                        <td className="p-4 font-body text-sm text-muted-foreground">{p.stock}</td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan={4} className="p-8 text-center font-body text-sm text-muted-foreground">No products yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Products</h1>
              <Button onClick={() => { resetForm(); setShowForm(true); }} className="rounded-sm gap-2">
                <Plus size={16} /> Add Product
              </Button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => resetForm()}>
                <div className="bg-background border border-border rounded-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                    {editingProduct ? "Edit Product" : "New Product"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1 block">Name *</label>
                      <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-sm" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1 block">Description</label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-sm bg-background font-body text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-foreground mb-1 block">Price *</label>
                        <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} className="rounded-sm" />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-foreground mb-1 block">Original Price</label>
                        <Input type="number" step="0.01" value={formData.original_price ?? ""} onChange={(e) => setFormData({ ...formData, original_price: e.target.value ? parseFloat(e.target.value) : null })} className="rounded-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-foreground mb-1 block">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-input rounded-sm bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="Women">Women</option>
                          <option value="Men">Men</option>
                          <option value="Kids">Kids</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-foreground mb-1 block">Stock</label>
                        <Input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} className="rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1 block">Image URL</label>
                      <Input value={formData.image_url || ""} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." className="rounded-sm" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1 block">Sizes (comma-separated)</label>
                      <Input value={(formData.sizes || []).join(", ")} onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="XS, S, M, L, XL" className="rounded-sm" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-foreground mb-1 block">Colors (comma-separated)</label>
                      <Input value={(formData.colors || []).join(", ")} onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="Black, White, Navy" className="rounded-sm" />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                        <input type="checkbox" checked={formData.is_new} onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })} className="accent-accent" /> New Arrival
                      </label>
                      <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                        <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="accent-accent" /> Featured
                      </label>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button onClick={handleSave} className="flex-1 rounded-sm">{editingProduct ? "Update" : "Create"}</Button>
                      <Button variant="outline" onClick={resetForm} className="rounded-sm">Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Product</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4 hidden md:table-cell">Category</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Price</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4 hidden md:table-cell">Stock</th>
                      <th className="text-left font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4 hidden lg:table-cell">Status</th>
                      <th className="text-right font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {p.image_url && <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-sm object-cover bg-secondary" />}
                            <span className="font-body text-sm text-foreground">{p.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">{p.category}</td>
                        <td className="p-4 font-body text-sm text-foreground">${Number(p.price).toFixed(2)}</td>
                        <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">{p.stock}</td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex gap-1">
                            {p.is_new && <span className="font-body text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-sm">New</span>}
                            {p.is_featured && <span className="font-body text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-sm">Featured</span>}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => handleEdit(p)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan={6} className="p-12 text-center font-body text-sm text-muted-foreground">No products yet. Click "Add Product" to get started.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
