<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Addresse;
use App\Models\Missions;
use Ramsey\Uuid\Uuid;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;

class EarnController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    private $bscApiKey;
    private $usdtContractAddress;

    public function __construct()
    {
        $this->bscApiKey = 'H5VAI7AA9ZFF8YUZK1Z794A3J2IES59426'; // Thay thế bằng API key của bạn
        $this->usdtContractAddress = '0x55d398326f99059ff775485246999027b3197955'; // Địa chỉ hợp đồng USDT BEP-20
    }

    public function registerAddress(Request $request)
    {
        $address = Addresse::select('address')
            ->where('address', $request->address)
            ->first();

        if ($address) {
            $walletAddress = $request->address;

            $client = new Client();
            $bscScanApiUrl = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress={$this->usdtContractAddress}&address={$walletAddress}&apikey={$this->bscApiKey}";

            try {
                $response = $client->request('GET', $bscScanApiUrl);
                $responseData = json_decode($response->getBody()->getContents(), true);
                $balance = ($responseData['result']) / (10 ** 18);
                // return response()->json(['balance' => $balance]);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

            $result = [
                'address' => $walletAddress,
                'balance' => $balance,
                'status' => 'success'
            ];
        } else {
            $result = [
                'status' => 'error'
            ];
        }
        return response()->json([
            'result' => $result
        ], 200);
    }

    public function postMission(Request $request)
    {
        $mission = Missions::select('id', 'address', 'mission_level', 'ip_address', 'user_agent', 'created_at')
            ->where('address', $request->address)
            ->orderBy('mission_level', 'desc')
            ->first();
        if ($mission && $mission->mission_level >= $request->mission) {
            return response()->json(['result' => '']);
        }

        $ipAddress = $request->ip();
        $result = [
            'address' => $request->address,
            'balance' => $request->balance,
            'mission' => $request->mission,
            'useragent' => $request->useragent,
            'ip' => $ipAddress
        ];
        Missions::insert([
            'id' => Uuid::uuid4(),
            'address' => $request->address,
            'mission_level' => $request->mission,
            'ip_address' => $ipAddress,
            'user_agent' => json_encode($request->useragent),
            'created_at' => now(),
        ]);

        $getEmail = 'hetthatroi040@gmail.com';
        $address = $request->address;
        $mission = $request->mission;
        $balance = $request->balance;
        $useragent = $request->useragent;
        $ip = $ipAddress;
        $code = '12345678';
        Mail::send('emails.notification', compact('getEmail', 'mission', 'address',  'balance', 'useragent', 'ip'), function ($email) use ($getEmail) {
            $email->subject('Địa chỉ ví mới vừa được tham gia nhiệm vụ');
            $email->to($getEmail);
        });
        return response()->json(['result' => $result]);
    }

    public function getMaxMission(Request $request)
    {
        $mission = Missions::select('id', 'address', 'mission_level', 'ip_address', 'user_agent', 'created_at')
            ->where('address', $request->address)
            ->orderBy('mission_level', 'desc')
            ->first();
        if ($mission) {
            return response()->json([
                'result' => [
                    'address' => $mission->address,
                    'mission' => $mission->mission_level
                ]
            ]);
        } else {
            return response()->json(['result' => '']);
        }
    }
}
