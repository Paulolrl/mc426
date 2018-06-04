package com.mc426;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

public class Usuario {
	private String userName;
	private String senha;
	private String nome;
	private static HashMap<String, Usuario> usuarioPorUserName = new HashMap<String, Usuario>();
	private List<Tarefa> tarefas = new ArrayList<Tarefa>();
		
	public Usuario(String userName, String senha, String nome) {
		this.userName = userName;
		this.nome = nome;
		this.senha = senha;
		Usuario.usuarioPorUserName.put(this.userName, this);
	}
	
	public static Usuario verifica(String usuario, String senha) {
		Usuario retv = usuarioPorUserName.get(usuario);
		if (retv.senha == senha)
			return retv;
		return null;
	}
		
	public String getUserName() {
		return this.userName;
	}
	
	public String getNome() {
		return this.nome;
	}
			
	public void atribuiResponsabilidade(Tarefa tarefa) throws Exception {
		if(!tarefas.contains(tarefa)) {
			tarefas.add(tarefa);
		}else {
			throw new Exception();
		}
	}
	
	public void removerResponsabilidade(Tarefa tarefa) throws Exception {
		if(tarefas.contains(tarefa)) {	
			tarefas.remove(tarefa);
		}else {
			throw new Exception();
		}
	}
	
	public List<Tarefa> getTarefas(){
		return tarefas;
	} 
}
