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
    protected $order,$user;

    /**
     * Create a new job instance.
     *
     * @param Order $order
     * @param User $user
     */
    public function __construct(Order $order)
    {
        $this->order=$order;
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
        $this->order->save();
        foreach ($this->order->Products() as $product){
            $product->Product()->Store()->first()->balance += ($product->price- ($product->price*($product->commission_percent/100))) * $product->quantity;
            User::find(1)->Store()->first()->balance += ($product->price * 2.5);
        }
        $child=new User();
        $current=$this->user??User::find(1);
        while ($current) {
            CommissionJob::dispatch($current->Affiliate()->first(), $child->Affiliate()->first(), $this->order->commission);
            $child=$current;
            $current=$current->parent()->first();

        }
    }
}
