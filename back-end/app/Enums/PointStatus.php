<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class PointStatus extends Enum
{
    const Active = 0;
    const Inactive = 1;
    const Suspended = 2;
}
