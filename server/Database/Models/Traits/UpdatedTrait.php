<?php

namespace Server\Database\Models\Traits;

trait UpdatedTrait
{
    public function getUpdatedAtMonthAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return strtoupper($dateTimeInstance->format('M'));
        }

        return $row;
    }

    public function getUpdatedAtDayAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return $dateTimeInstance->format('d');
        }

        return $row;
    }
}
