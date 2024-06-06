<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Addresse;
use Ramsey\Uuid\Uuid;

class EarnController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function registerAddress(Request $request)
    {
        // Uuid::uuid4(),
        $address = Addresse::select('address')
            ->where('address', $request->address)
            ->first();

        if ($address) {
            return response()->json(['result' => 'success'], 200);
        } else {
            return response()->json(['result' => 'error'], 200);
        }
    }
}
