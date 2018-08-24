<?php

Class User_Model extends CI_Model {

	public function listUsers($active=true) {

			$this->db->select('*');
			$this->db->from('users');
			if($active == 'true')
			{
				$this->db->where('user_status = 1');
			} else {
				$this->db->where('user_status != 0');
			}
			
			$this->db->order_by('createdOn', 'desc');
			$query = $this->db->get();
			$data=array();
			$data['result']=$query->result_array();
			return $data;

		}


	public function getUser($id='') {
			$this->db->select('*');
			$this->db->from('users');
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
		
	public function login($data) {

		$condition = "emailId =" . "'" . $data['emailId'] . "' AND " . "password =" . "'" . $data['password'] . "'";
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return $query->result();
			//return true;
		} else {
			return false;
		}
	}


	public function deleteUser($id) {
		$this->db->set('user_status',0);
		$this->db->where('id', $id);
		$this->db->update('users');
		
		if ($this->db->affected_rows() > 0) {
			return true;
		}
	return false;

	}


	public function addUser($data) {
		// Query to insert data in database
		$this->db->insert('users', $data);
		if ($this->db->affected_rows() > 0) {
		return true;
		}
		return false;

	}

	public function updateUser($id,$data) {


	$this->db->where('id', $id);
	$this->db->update('users', $data);

		if ($this->db->affected_rows() > 0) {
		return true;
		}
		return false;

	}
	public function record_count($active=true) {
		$this->db->select('*');
		$this->db->from('users');
		if($active == 'true')
		{
			$this->db->where('user_status = 1');
		} else {
			$this->db->where('user_status != 0');
		}
		$query = $this->db->get();
		return $query->num_rows();;
	}

	 public function fetch_request($limit, $start) {

	   $this->db->select('*');
		$this->db->from('users');
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