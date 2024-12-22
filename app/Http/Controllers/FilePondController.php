<?php

namespace App\Http\Controllers;

use App\Http\Requests\Filepond\ProcessFilePondRequest;
use Illuminate\Support\Facades\Storage;

class FilePondController extends Controller
{
    public function store(ProcessFilePondRequest $request): string {
        $file = $request->file('profile_picture');
        $filename = $file->getClientOriginalName();
        $folder = uniqid().'-'.now()->timestamp;
        $file->storeAs('profile_pics/tmp/'.$folder, $filename); 
        return $folder;
    }

    public function revert($uniqueId): string {
        if(Storage::exists('profile_pics/tmp/'.$uniqueId)){
            if(Storage::deleteDirectory('profile_pics/tmp/'.$uniqueId)){
                return 'Profile Pic Deleted';
            }else{
                return 'Profile Pic Not Deleted';
            }
        }
        return '';
    }
}
