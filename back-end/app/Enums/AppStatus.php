<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class AppStatus extends Enum
{
    const Approved = 0;
    const Refused = 1;
    const Pending = 2;
}
