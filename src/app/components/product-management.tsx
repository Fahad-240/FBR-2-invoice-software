import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    id: string;
    hs_code: string;
    name: string;
    unit: string;
    default_rate: number;
    tax_percent: number;
}

export function ProductManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([
        { id: '1', hs_code: '5205.1100', name: 'Cotton Yarn 20/1 Carded', unit: 'KG', default_rate: 485.50, tax_percent: 18 },
        { id: '2', hs_code: '5208.1100', name: 'Grey Fabric 60x60/90x88', unit: 'MTR', default_rate: 145.00, tax_percent: 18 },
        { id: '3', hs_code: '6109.1000', name: 'Mens Cotton T-Shirt (White)', unit: 'PCS', default_rate: 850.00, tax_percent: 18 },
        { id: '4', hs_code: '3907.6100', name: 'Polyester Staple Fiber', unit: 'KG', default_rate: 320.00, tax_percent: 18 },
        { id: '5', hs_code: '2710.1900', name: 'Industrial Grade Lubricant X1', unit: 'LTR', default_rate: 650.00, tax_percent: 18 },
    ]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        hs_code: '',
        name: '',
        unit: 'PCS',
        default_rate: 0,
        tax_percent: 18,
    });

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hs_code.includes(searchQuery)
    );

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                hs_code: product.hs_code,
                name: product.name,
                unit: product.unit,
                default_rate: product.default_rate,
                tax_percent: product.tax_percent,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                hs_code: '',
                name: '',
                unit: 'PCS',
                default_rate: 0,
                tax_percent: 18,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
            toast.success('Product updated locally');
        } else {
            const newProduct: Product = {
                ...formData,
                id: Math.random().toString(36).substr(2, 9),
            };
            setProducts([...products, newProduct]);
            toast.success('Product added locally');
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
            toast.success('Product removed locally');
        }
    };

    return (
        <div className="max-w-[1600px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl text-slate-900 mb-1">Product Management</h1>
                    <p className="text-sm text-slate-600">Manage your items, HS codes, and tax rates (Mock Mode)</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-sm hover:bg-black transition-colors font-semibold"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
                <div className="p-4 lg:p-6 border-b border-slate-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or HS code..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black bg-slate-50/50"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f8f9fb] border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">HS Code</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Product Name</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Unit</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Default Rate</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Tax %</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-tight">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500 font-medium">
                                        No products found in local state.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-5">
                                            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100 italic">
                                                {product.hs_code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-800">{product.name}</td>
                                        <td className="px-6 py-5 text-sm text-slate-600">{product.unit}</td>
                                        <td className="px-6 py-5 text-sm text-slate-700 font-medium">PKR {product.default_rate}</td>
                                        <td className="px-6 py-5">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-sm text-xs font-bold border border-emerald-100">
                                                {product.tax_percent.toFixed(2)}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-sm transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-sm shadow-xl w-full max-w-lg border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-sm transition-colors text-slate-400"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">HS Code *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.hs_code}
                                        onChange={(e) => setFormData({ ...formData, hs_code: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="e.g. 1123.00"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Unit *</label>
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    >
                                        <option>PCS</option>
                                        <option>KG</option>
                                        <option>LTR</option>
                                        <option>MTR</option>
                                        <option>BOX</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Default Rate (PKR)</label>
                                    <input
                                        type="number"
                                        value={formData.default_rate}
                                        onChange={(e) => setFormData({ ...formData, default_rate: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Tax Percent (%)</label>
                                    <input
                                        type="number"
                                        value={formData.tax_percent}
                                        onChange={(e) => setFormData({ ...formData, tax_percent: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 transition-colors text-sm font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-sm hover:bg-black transition-colors text-sm font-semibold"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
