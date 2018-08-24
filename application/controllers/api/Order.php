<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Order extends REST_Controller {

    function __construct()
    {
        parent::__construct();

		// Load database
		$this->load->model('Order_Model','order_model');

    }

    public function product_post()
    {

        var_dum($_REQUEST);
        die();

        $this->response([
            'status' => TRUE,
            'result' => "Ok"
        ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code

    }




}
