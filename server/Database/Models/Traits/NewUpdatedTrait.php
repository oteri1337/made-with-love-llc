<?php

namespace Server\Database\Models\Traits;

trait NewUpdatedTrait
{
    public function getUpdatedDateAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return ucfirst($dateTimeInstance->format('d M'));
        }

        return $row;
    }

    public function getUpdatedTimeAttribute($row)
    {
        if (!$row) {
            $dateTimeInstance = new \DateTime($this->created_at);
            return $dateTimeInstance->format('g:i');
        }

        return $row;
    }
}
