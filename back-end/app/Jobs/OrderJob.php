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
    public function __construct(Order $order,User $user)
    {
        $this->order=$order;
        $this->user=$user;
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
        $child=null;
        $current=$this->user;
        while ($current->parent()) {
            CommissionJob::dispatchNow($current->Affiliate()->first(), $child != null? $child->Affiliate()->first():new Affiliate(), $this->order->commission);
            $child=$current;
            $current=$current->parent();
        }
    }
}
