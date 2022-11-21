<?php

namespace Server\Database\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class ApiModel extends Model
{
    public $apiWith = [];
    public $apiPerPage = 50;
    public $apiReadBy = "id";
    public $apiSearchBy = "id";

    public function apiList()
    {

        $paginator = $this->latest()->paginate($this->apiPerPage); 

        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = Collection::make($paginator['data'])->keyBy($this->apiSearchBy);

        return $paginator;
    } 

    public function apiSearch($body)
    {

        $paginator = $this->where($this->apiSearchBy, 'LIKE', "%{$body['search']}%")->paginate($this->apiPerPage); 

        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = Collection::make($paginator['data'])->keyBy($this->apiSearchBy);

        return $paginator;
    }

    public function apiCreate($body)
    {
        return $this->create($body);
    }

    public function apiRead($attr)
    {
        $data = $this->where('id', $attr)->first();
        $data = $this->relationships($data);
        return $data;
    }

    public function apiUpdate($body)
    {
        $row = $this->where("id", $body['id'])->first();

        $row->update($body);

        $row = $this->where('id', $body['id'])->first();

        // $row = $this->relationships($row);
        
        return $row;
    }

    public function apiDelete($body)
    {
        $this->where("id", $body["id"])->delete();

        $paginator = $this->latest()->paginate($this->apiPerPage); 

        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = Collection::make($paginator['data'])->keyBy($this->apiSearchBy);

        return $paginator;
    }

}