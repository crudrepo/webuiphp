<?php

Class Cart_Model extends CI_Model {

	public function listCart($userId) {

			$this->db->select('*');
			$this->db->from('cart');
			$this->db->join('products', 'cart.productid = products.id');
			$this->db->where('userid',$userId);
			$this->db->order_by('addedOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}

	public function deleteCartItem($id,$userId, $empty = false) {
		if($empty == 'true') {
			$this->db->where('userid', $userId);
		} else {
			$this->db->where('id', $id);
		}
		
		$this->db->delete('cart');
		
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}


	public function addCartItem($data) {
		// Query to insert data in database
		$this->db->insert('cart', $data);
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}

	public function updateCartItem($id,$data) {
		$this->db->where('id', $id);
		$this->db->update('cart', $data);

			if ($this->db->affected_rows() > 0) {
			return true;
			}
			return false;

		}

}

?>