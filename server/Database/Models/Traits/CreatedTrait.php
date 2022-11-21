<?php

namespace Server\Database\Models\Traits;

trait CreatedTrait
{
    public function getCreatedAtMonthAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return strtoupper($dateTimeInstance->format('M'));
        }

        return $row;
    }

    public function getCreatedAtDayAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return $dateTimeInstance->format('d');
        }

        return $row;
    }
}
