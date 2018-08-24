<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Cart extends REST_Controller {

    function __construct()
    {
        parent::__construct();

		// Load database
		$this->load->model('Cart_Model','cart_model');
		
    }
	public function cart_get()
    {

        $id = $this->get('userid');
		$id = (int) $id;
		// Validate the id.
            if (empty($id))
            {
                $this->response([
                    'status' => FALSE,
                    'message' => 'invalid user Id'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }
			
			$category = $this->cart_model->listCart($id);

            if ($category)
            {
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'result' => $category
                ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No data were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        
    }
	
    public function cart_post()
    {
		$data=array(
				'userid'=>$this->post('userid'),
				'productid'=>$this->post('productid'),
				'quantity'=>$this->post('quantity')
		);
         if($this->cart_model->addCartItem($data)){
			  $message = [
					'name' => $this->post('productid')
					'message' => 'Added Successfully'
				];

				$this->set_response([
							'status' => TRUE,
							'message' => $message 
						], REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code */
		 } else {
			 $this->response([
                    'status' => FALSE,
                    'message' => 'Error while adding'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		 }
        
    }

	
    public function cart_put($id)
    {
		
        //$id = $this->get('id');
		$id = (int) $id;
		
        // Validate the id.
        if (empty($id))
        {
            // Set the response and exit
           $this->response([
                    'status' => FALSE,
                    'message' => 'invalid Id'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

		$data=array(
				'userid'=>$this->put('userid'),
				'productid'=>$this->put('productid'),
				'quantity'=>$this->put('quantity')
		);
         if($this->cart_model->updateCartItem($id,$data)) {
				 $message = [
				'id' => $id, // Automatically generated by the model
				'name' => $this->put('productid'),
				'message' => ' Updated Successfully! '
			];

			$this->set_response([
                    'status' => TRUE,
                    'message' => $message
                ], REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code */
		 }  else {
			 $this->response([
                    'status' => FALSE,
                    'message' => 'Error while updating '
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		 }
         
    }
	
    public function cart_delete($id,$userId,$empty=false)
    {
        $id = (int) $id;
        $userId =$userId;
        $empty = (boolean) $empty;

        // Validate the id.
        if (empty($id))
        {
              $this->response([
                    'status' => FALSE,
                    'message' => 'invalid Id'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

       if( $this->cart_model->deleteCartItem($id,$userId,$empty)) {
		    $message = [
				'id' => $id,
				'message' => 'Deleted User Successfully'
			];

			$this->set_response([
                    'status' => TRUE,
                    'message' => $message
                ], REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code */
	   } else {
		    $this->response([
                    'status' => FALSE,
                    'message' => 'Error while updating user'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
	   }
       
    }
	

}