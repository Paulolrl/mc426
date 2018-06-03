package com.mc426.restjersey;

import java.util.HashMap;

public class Usuario {
	private int id;
	private String userName;
	private String senha;
	private String nome;
	private int idade;
	private static int ultimoId = 1;
	private static HashMap<Integer, Usuario> usuarioPorId = new HashMap<Integer, Usuario>();
	
	
	public Usuario(String userName, String senha, String nome, int idade) {
		this.id = Usuario.proximoId();
		this.userName = userName;
		this.nome = nome;
		this.idade = idade;
		this.senha = senha;
		Usuario.usuarioPorId.put(this.id, this);
	}
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	public static Usuario getPorId(int id){
		return Usuario.usuarioPorId.get(id);
	}
	
	public String getUserName() {
		return this.userName;
	}
	
	public String getNome() {
		return this.nome;
	}
	
	public int getIdade() {
		return this.idade;
	}
	
	public int getId() {
		return this.id;
	}
}
