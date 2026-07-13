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
            'brand' => 'nullable|string',
            'tags' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'unit_type' => 'nullable|string',
            'min_quantity' => 'integer|min:1',
            'max_quantity' => 'nullable|integer',
            'current_stock' => 'integer',
            'low_stock_limit' => 'integer',
            'buying_price' => 'nullable|numeric',
            'selling_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'status' => 'boolean',
            'stock_availability' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
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
            'brand' => 'nullable|string',
            'tags' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'unit_type' => 'nullable|string',
            'min_quantity' => 'integer|min:1',
            'max_quantity' => 'nullable|integer',
            'current_stock' => 'integer',
            'low_stock_limit' => 'integer',
            'buying_price' => 'nullable|numeric',
            'selling_price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'status' => 'boolean',
            'stock_availability' => 'boolean',
        ]);

        if ($request->name !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
