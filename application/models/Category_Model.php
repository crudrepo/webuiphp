<?php

Class Category_Model extends CI_Model {

	public function listCategory($active=true) {

			$this->db->select('*');
			$this->db->from('category');
			if($active == 'true')
			{
				$this->db->where('status = 1');
			} else {
				$this->db->where('status != 0');
			}
			
			$this->db->order_by('name', 'asc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function getCategory($id='') {
			$this->db->select('*');
			$this->db->from('category');
			if(!empty($id))
			{
				$this->db->where('id',$id);
			}
			$this->db->order_by('name', 'asc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function deleteCategory($id) {
		$this->db->set('status',0);
		$this->db->where('id', $id);
		$this->db->update('category');
		
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}


	public function addCategory($data) {
		// Query to insert data in database
		$this->db->insert('category', $data);
		if ($this->db->affected_rows() > 0) {
			return true;
		}
		return false;

	}

	public function updateCategory($id,$data) {


	$this->db->where('id', $id);
	$this->db->update('category', $data);

		if ($this->db->affected_rows() > 0) {
		return true;
		}
		return false;

	}
	public function record_count($active=true) {
		$this->db->select('*');
		$this->db->from('category');
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
		$this->db->from('category');
		$this->db->order_by("name", "asc");
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