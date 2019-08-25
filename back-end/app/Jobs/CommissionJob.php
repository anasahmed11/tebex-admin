<?php

namespace App\Jobs;

use App\Affiliate;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

class CommissionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $self,$child,$commission;

    /**
     * Create a new job instance.
     *
     * @param Affiliate $self
     * @param Affiliate $child
     * @param $commission
     */
    public function __construct(Affiliate $self, $child ,$commission)
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
        $planChild=$this->child?$this->child->Plan()->first():null;
        $commission=$this->commission;

        if (!$planChild){
            $aff->inactive_balance += $commission * (($planSelf->commission/100) * 2.5);
            $aff->save();
        }else{
            if ($planSelf->commission > $planChild->commission) {
                $aff->inactive_balance += $commission * ((($planSelf->commission - $planChild->commission)/100)*2.5);
                $aff->save();
            }
        }
    }
}
