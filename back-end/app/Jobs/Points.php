<?php

namespace App\Jobs;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class Points implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @param User $user
     * @param $point
     * @param $type
     */
    protected $user;
    protected $point;
    protected $type;
    public function __construct(User $user,$point,$type)
    {
        $this->user=$user;
        $this->point=$point;
        $this->type=$type;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->type="active"){
            $this->user->active_points +=$this->point;
        }elseif($this->type="inactive") {
            $this->user->inactive_points +=$this->point;
        }elseif($this->type="suspended") {
            $this->user->suspended_points += $this->point;
        }
    }
}
