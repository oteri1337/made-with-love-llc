<?php

namespace Server\Controllers\Library\Traits;

trait UtilsTrait
{

    public function uploadImage($image, $name = "")
    {
        if (strlen($name) == 0) {
            $name = time().".jpg";
        } else {
            $name = $name.".jpg";
        }

        try {
            move_uploaded_file($image['tmp_name'], IMAGE_DIR . $name);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        return $name;
    }


    public function createRules($body)
    {
        return [];
    }

    protected function updateRules($body)
    {
        return $this->createRules($body);
    }

    public function createBody($body)
    {
        echo "please implement create body method in controller";
        return $body;
    }

    protected function updateBody($body, $row)
    {
        return $this->createBody($body);
    }

    protected function relationships($row)
    {
        return $row;
    }

    public function getListModel()
    {
        return $this->model->latest();
    }

    public function getOptimizedList()
    {
        $builder = $this->getListModel();
        $collection = $builder->get();
        $paginator = $builder->paginate($this->perPage);
        return $this->optimize($paginator, $collection);
    }

    public function optimize($paginator, $collection)
    {
        $data = $paginator->toArray();
        $data["object"] = $collection->keyBy($this->readBy)->toArray();
        $data["search_keys"] = [];

        foreach ($data["object"] as $row) {
            $data["search_keys"][$row[$this->searchBy]] = null;
        }

        return $data;
    }

    protected function filter($body, $keysWhitelist)
    {
        return array_filter($body, function ($item, $key) use ($keysWhitelist) {
            return in_array($key, $keysWhitelist);
        }, ARRAY_FILTER_USE_BOTH);
    }

    public function removeImage($name)
    {
        if ($name !== "default.png") {
            unlink(IMAGE_DIR . $name);
        }
    }

    public function slugify($string)
    {
        $slug = strtolower($string);
        $slug = str_replace(' ', '-', $slug);
        return $slug;
    }



    protected function prepareFiles($files, $id)
    {
        foreach ($files as $key => &$file) {
            $name = strtolower($file['name']);
            $startPoint = strlen($name) - 3;
            $format = substr($name, $startPoint);
            $file['format'] = $format;
            $file['new_name'] = $key . "_" . $id . "." . $format;
        }
        return $files;
    }
}