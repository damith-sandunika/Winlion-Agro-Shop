<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('items')->latest()->get());
    }

    public function store(Request $request)
    {
        if (is_string($request->items)) {
            $request->merge(['items' => json_decode($request->items, true)]);
        }

        $validated = $request->validate([
            'customer_name' => 'required|string',
            'whatsapp_number' => 'required|string',
            'delivery_address' => 'required|string',
            'province' => 'nullable|string',
            'district' => 'nullable|string',
            'city' => 'nullable|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'payment_method' => 'required|string',
            'payment_slip' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:5120',
            'delivery_charge' => 'numeric',
            'sub_total' => 'required|numeric',
            'discount_amount' => 'numeric',
            'coupon_code' => 'nullable|string',
            'grand_total' => 'required|numeric',
            'order_notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.product_name' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric',
            'items.*.total_price' => 'required|numeric',
        ]);

        // Generate unique tracking number and invoice
        $validated['tracking_number'] = 'TRK-' . strtoupper(Str::random(10));
        $validated['invoice_number'] = 'INV-' . strtoupper(Str::random(8));

        $orderData = collect($validated)->except(['items', 'payment_slip'])->toArray();
        
        if ($request->hasFile('payment_slip')) {
            $orderData['payment_slip'] = $request->file('payment_slip')->store('slips', 'public');
        }
        $order = Order::create($orderData);

        foreach ($validated['items'] as $item) {
            $order->items()->create($item);
        }

        // Send WhatsApp Message to Customer (Order Placed)
        $this->sendWhatsAppMessage($order, 'wa_order_template');

        // Send WhatsApp Notification to Admin
        try {
            $adminNumber = \App\Models\Setting::where('key', 'whatsapp_number')->value('value');
            if ($adminNumber) {
                $adminMessage = "🔔 *New Order Received!*\n\n*Invoice:* {$order->invoice_number}\n*Customer:* {$order->customer_name}\n*Total:* Rs. " . number_format($order->grand_total, 2) . "\n\nPlease check the admin dashboard for more details.";
                \Illuminate\Support\Facades\Http::post('http://127.0.0.1:3005/send', [
                    'number' => $adminNumber,
                    'message' => $adminMessage
                ]);
            }
        } catch (\Exception $e) {
            // Ignore errors
        }

        return response()->json($order->load('items'), 201);
    }

    public function show(Order $order)
    {
        return response()->json($order->load('items'));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'payment_status' => 'nullable|string',
            'delivery_status' => 'nullable|string',
        ]);

        $order->update($validated);

        if ($request->has('delivery_status')) {
            if ($validated['delivery_status'] === 'Confirmed') {
                $this->sendWhatsAppMessage($order, 'wa_confirm_template');
            } elseif ($validated['delivery_status'] === 'Delivered') {
                $this->sendWhatsAppMessage($order, 'wa_delivery_template');
            } elseif ($validated['delivery_status'] === 'Completed') {
                $this->sendWhatsAppMessage($order, 'wa_completed_template');
            } elseif ($validated['delivery_status'] === 'Cancelled') {
                $this->sendWhatsAppMessage($order, 'wa_cancelled_template');
            }
        }

        return response()->json($order);
    }

    private function sendWhatsAppMessage($order, $templateKey)
    {
        try {
            $template = \App\Models\Setting::where('key', $templateKey)->value('value');
            if (!$template) {
                if ($templateKey === 'wa_order_template') {
                    $template = "Hello {{customer_name}},\n\nYour order ({{invoice}}) has been successfully placed at Win Lion Agro Shop!\nTotal: Rs. {{total}}\nDelivery Address: {{address}}\n\nWe will contact you shortly regarding the delivery.\n\nThank you for shopping with us! 🌱";
                } elseif ($templateKey === 'wa_confirm_template') {
                    $template = "Hi {{customer_name}},\n\nGreat news! Your order ({{invoice}}) has been *Confirmed* and is now being prepared for dispatch.\n\nBest Regards,\nWin Lion Agro";
                } elseif ($templateKey === 'wa_delivery_template') {
                    $template = "Hi {{customer_name}},\n\nYour order ({{invoice}}) has been dispatched and is currently *Out for Delivery*. 🚚\n\nBest Regards,\nWin Lion Agro";
                } elseif ($templateKey === 'wa_completed_template') {
                    $template = "Hi {{customer_name}},\n\nYour order ({{invoice}}) has been successfully *Delivered* and marked as *Completed*! 🎉\n\nThank you for choosing Win Lion Agro. We hope to serve you again soon!\n\nBest Regards,\nWin Lion Agro";
                } elseif ($templateKey === 'wa_cancelled_template') {
                    $template = "Hi {{customer_name}},\n\nWe regret to inform you that your order ({{invoice}}) has been *Cancelled*.\nIf you have any questions, please contact our support.\n\nBest Regards,\nWin Lion Agro";
                } else {
                    return;
                }
            }

            $message = str_replace(
                ['{{customer_name}}', '{{invoice}}', '{{total}}', '{{address}}'],
                [$order->customer_name, $order->invoice_number, number_format($order->grand_total, 2), $order->delivery_address],
                $template
            );

            \Illuminate\Support\Facades\Http::post('http://127.0.0.1:3005/send', [
                'number' => $order->whatsapp_number,
                'message' => $message
            ]);
        } catch (\Exception $e) {
            // Ignore errors for now to prevent breaking the flow
        }
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
