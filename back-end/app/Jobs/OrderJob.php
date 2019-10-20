<?php

namespace App\Jobs;

use App\Affiliate;
use App\Order;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Debug\Debug;

class OrderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $order,$user,$products;

    /**
     * Create a new job instance.
     *
     * @param Order $order
     * @param User $user
     */
    public function __construct(Order $order)
    {
        $this->order=$order;
        $this->products=$order->Products()->get();
        $this->user=$this->order->Referral()->first();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->order->returnable=false;
        foreach ($this->products as $product) {
            $pp=$product->Product()->first()->Store()->first();
            $pp->balance += (($product->price - $product->commission) * $product->quantity)-10;
            $pp->save();
            $ppp = User::find(1)->Store()->first();
            $ppp->balance += ($product->price * (2.5/ 100))*$product->quantity +10;
            $ppp->save();

        }
        $this->order->save();
        $child=new User();
        $current=$this->user??User::find(1);
        while ($current) {
            CommissionJob::dispatch($current->Affiliate()->first(), $child->Affiliate()->first(), $this->order->commission);
            $child=$current;
            $current=$current->parent()->first();

        }
    }
}
