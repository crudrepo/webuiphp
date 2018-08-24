<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Product extends REST_Controller {

    function __construct()
    {
        parent::__construct();

		// Load database
		$this->load->model('Product_Model','product_model');

    }
	public function product_get()
    {

        $id = $this->get('id');
		$id = (int) $id;
		// Validate the id.
            if (empty($id))
            {
                $this->response([
                    'status' => FALSE,
                    'message' => 'invalid Id'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

			$category = $this->product_model->getProduct($id);

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

	public function productlist_get()
    {
			$products = $this->product_model->listProducts(true);

			if ($products)
            {
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'result' => $products
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

    public function product_post()
    {
        error_reporting(0);
        $file_name = "";
        if(isset($_FILES['file'])){
            $target_dir = __DIR__."/../../../images";
            $errors= array();
            $file_name = $_FILES['file']['name'];
            $file_size =$_FILES['file']['size'];
            $file_tmp =$_FILES['file']['tmp_name'];
            $file_type=$_FILES['file']['type'];
            $file_ext=strtolower(end(explode('.',$_FILES['file']['name'])));

            $expensions= array("jpeg","jpg","png");

            if(in_array($file_ext,$expensions)=== false){

                $this->response([
                    'status' => FALSE,
                    'message' => 'extension not allowed, please choose a JPEG or PNG file.'
                ],  REST_Controller::HTTP_CREATED); // BAD_REQUEST (400) being the HTTP response code
            }

            if($file_size > 2097152){
                $errors[]='';
                $this->response([
                    'status' => FALSE,
                    'message' => 'File size must be excately 2 MB'
                ],  REST_Controller::HTTP_CREATED); // BAD_REQUEST (400) being the HTTP response code
            }

            if(empty($errors)==true){
                move_uploaded_file($file_tmp,$target_dir."/".$file_name);

            }else{
                print_r($errors);
            }
        }

		$data=array(
				'name'=>$this->post('name'),
				'category'=>$this->post('category'),
				'description'=>$this->post('description'),
		        'image'=>$file_name,
				'price'=>$this->post('price'),
				'createdOn'=>date('Y-m-d H:i:s')
		);
         if($this->product_model->addProduct($data)){
			  $message = [
					'name' => $this->post('name'),
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
			 ],  REST_Controller::HTTP_CREATED); // BAD_REQUEST (400) being the HTTP response code
		 }

    }


    public function product_put($id)
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
				'name'=>$this->post('name'),
				'category'=>$this->post('category'),
				'description'=>$this->post('description'),
				'image'=>$this->post('image'),
				'price'=>$this->post('price')
		);
         if($this->product_model->updateProduct($id,$data)) {
				 $message = [
				'id' => $id, // Automatically generated by the model
				'name' => $this->put('name'),
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

    public function product_delete($id)
    {
        $id = (int) $id;

        // Validate the id.
        if (empty($id))
        {
              $this->response([
                    'status' => FALSE,
                    'message' => 'invalid Id'
                ], REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

       if( $this->product_model->deleteProduct($id)) {
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
