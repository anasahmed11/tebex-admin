<?php

namespace App\Jobs;

use App\Affiliate;
use App\Plan;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CommissionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $self,$child,$commission;
    /**
     * Create a new job instance.
     *
     * @param User $user
     * @param Plan $planSelf
     * @param Plan $planParent
     * @param $commission
     */
    public function __construct(Affiliate $self,Affiliate $child ,$commission)
    {
        $this->self=$self;
        $this->child=$child;
        $this->commission=$commission;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
            $aff= $this->self;
            $planSelf=$aff->Plan()->first();
            $planChild=$this->child->Plan()->first();
            $commission=$this->commission;
            if ($this->child == null){
                $aff->inactive_balance += $commission * ($planSelf->commission * 2.5);
                $aff->save();
            }else{
                if ($planSelf->commission > $planChild->commission) {
                    $aff->inactive_balance += $commission * (($planSelf->commission - $planChild->commission)*2.5);
                }
            }
    }
}
