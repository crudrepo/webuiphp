<?php

Class Product_Model extends CI_Model {

	public function listProducts($active=true) {

			$this->db->select('*');
			$this->db->from('products');
			if($active == 'true')
			{
				$this->db->where('status = 1');
			} else {
				$this->db->where('status != 0');
			}
			
			$this->db->order_by('createdOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function getProduct($id='') {
			$this->db->select('*');
			$this->db->from('products');
			if(!empty($id))
			{
				$this->db->where('id',$id);
			}
			$this->db->order_by('createdOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function deleteCategory($id) {
		$this->db->set('status',0);
		$this->db->where('id', $id);
		$this->db->update('products');
		
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}


	public function addCategory($data) {
		// Query to insert data in database
		$this->db->insert('products', $data);
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}

	public function updateCategory($id,$data) {


	$this->db->where('id', $id);
	$this->db->update('products', $data);

		if ($this->db->affected_rows() > 0) {
		return true;
		}
		return false;

	}
	public function record_count($active=true) {
		$this->db->select('*');
		$this->db->from('products');
		if($active == 'true')
		{
			$this->db->where('status = 1');
		} else {
			$this->db->where('status != 0');
		}
		$query = $this->db->get();
		return $query->num_rows();;
	}

	 public function fetch_request($limit, $start) {

	   $this->db->select('*');
		$this->db->from('products');
		$this->db->order_by("createdOn", "desc");
		$this->db->limit($limit, $start);
		$query = $this->db->get();

		if ($query->num_rows() > 0) {
			foreach ($query->result_array() as $row) {
				$data[] = $row;
			}
			return $data;
		}
		return false;
	}

}

?>