<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        $todaysSales = Order::whereDate('created_at', $today)->where('payment_status', 'Paid')->sum('grand_total');
        $monthlySales = Order::whereBetween('created_at', [$startOfMonth, Carbon::now()])->where('payment_status', 'Paid')->sum('grand_total');
        
        $totalOrders = Order::count();
        $pendingOrders = Order::where('delivery_status', 'Pending')->count();
        $deliveredOrders = Order::where('delivery_status', 'Delivered')->count();
        
        $totalProducts = Product::count();
        $lowStockAlerts = Product::whereColumn('current_stock', '<=', 'low_stock_limit')->count();

        // Best selling logic (grouped by product_id in order_items)
        // For simplicity, just get recent orders here.
        $latestOrders = Order::with('items')->latest()->take(5)->get();

        return response()->json([
            'todaysSales' => $todaysSales,
            'monthlySales' => $monthlySales,
            'totalOrders' => $totalOrders,
            'pendingOrders' => $pendingOrders,
            'deliveredOrders' => $deliveredOrders,
            'totalProducts' => $totalProducts,
            'lowStockAlerts' => $lowStockAlerts,
            'latestOrders' => $latestOrders,
        ]);
    }
}
