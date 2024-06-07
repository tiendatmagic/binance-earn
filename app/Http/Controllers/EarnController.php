<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Addresse;
use Ramsey\Uuid\Uuid;
use GuzzleHttp\Client;

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


        // Uuid::uuid4(),
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
        return response()->json(['result' => $result], 200);
    }
}
