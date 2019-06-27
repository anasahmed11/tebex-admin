<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class OrderStatus extends Enum
{
    const Pending = 0;
    const Active = 1;
    const Shipped = 2;
    const Delivered = 3;
    const Canceled = 4;
    const Returned = 5;
}
