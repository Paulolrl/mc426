package com.mc426;

import java.util.HashMap;

public class Usuario {
	private int id;
	private String userName;
	private String senha;
	private String nome;
	private int idade;
	private static int ultimoId = 1;
	private static HashMap<Integer, Usuario> usuarioPorId = new HashMap<Integer, Usuario>();
	private static HashMap<Integer, Tarefa> tarefas = new HashMap<Integer, Tarefa>();
	
	
	
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
	
	public void atribuiResponsabilidade(Tarefa tarefa) throws Exception {
		if(!tarefas.containsKey(tarefa.getId())) {
			tarefas.put(tarefa.getId(), tarefa);
		}
		throw new Exception();
	}
	
	public void removerResponsabilidade(Tarefa tarefa) throws Exception {
		if(tarefas.containsKey(tarefa.getId())) {	
			tarefas.remove(tarefa.getId());
		}
		throw new Exception();
	}
}
