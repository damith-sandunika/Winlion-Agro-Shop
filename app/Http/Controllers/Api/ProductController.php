<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|unique:products',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'image' => 'nullable',
            'brand' => 'nullable|string',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'expiry_date' => 'nullable|date',
            'batch_number' => 'nullable|string',
            'tags' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'unit_type' => 'nullable|string',
            'min_quantity' => 'nullable|integer|min:1',
            'max_quantity' => 'nullable|integer',
            'current_stock' => 'nullable|integer',
            'low_stock_limit' => 'nullable|integer',
            'buying_price' => 'nullable|numeric',
            'selling_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'status' => 'nullable|boolean',
            'stock_availability' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['images'] = [$path];
        }
        
        unset($validated['image']);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('category'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|unique:products,sku,' . $product->id,
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'image' => 'nullable',
            'brand' => 'nullable|string',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'expiry_date' => 'nullable|date',
            'batch_number' => 'nullable|string',
            'tags' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'unit_type' => 'nullable|string',
            'min_quantity' => 'nullable|integer|min:1',
            'max_quantity' => 'nullable|integer',
            'current_stock' => 'nullable|integer',
            'low_stock_limit' => 'nullable|integer',
            'buying_price' => 'nullable|numeric',
            'selling_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'status' => 'nullable|boolean',
            'stock_availability' => 'nullable|boolean',
        ]);

        if ($request->name !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['images'] = [$path];
        }

        unset($validated['image']);

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
