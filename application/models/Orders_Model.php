<?php

Class Orders_Model extends CI_Model {

	public function listOrders($userId) {

			$this->db->select('*');
			$this->db->from('orders');
			$this->db->join('orderdetails', 'orders.id = orderdetails.orderid');
			$this->db->where('orders.userId',$userId);
			$this->db->order_by('createdOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function getOrder($id='') {
			$this->db->select('*');
			$this->db->from('orders');
			$this->db->join('orderdetails', 'orders.id = orderdetails.orderid');
			if(!empty($id))
			{
				$this->db->where('orders.id',$id);
			}
			$this->db->order_by('createdOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function addOrder($data) {
		// Query to insert data in database
		$this->db->insert('orders', $data);
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}

	public function addOrderDetails($data) {
			// Query to insert data in database
			$this->db->insert('orderdetails', $data);
			if ($this->db->affected_rows() > 0) {
				return true;
			}
			return false;

		}
}

?>