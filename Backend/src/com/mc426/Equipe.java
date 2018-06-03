package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;

public class Equipe {
	
	private int id;
	private String nome;
	private static int ultimoId = 1;
	private static HashMap<Integer, Equipe> equipePorId = new HashMap<Integer, Equipe>();
	private static HashMap<Integer, Usuario> usuarios = new HashMap<Integer, Usuario>();
	private static HashMap<Integer, Projeto> projetos = new HashMap<Integer, Projeto>();
	
	public Equipe(String nome) {
		this.id = proximoId();
		this.nome = nome;
		Equipe.equipePorId.put(this.id, this);
	}
	
	public static Equipe getPorId(int id){
		return Equipe.equipePorId.get(id);
	}
	
	public void adicionarMembros(ArrayList<Usuario> membros) throws Exception {
		for(Usuario membro: membros) {
			if(!usuarios.containsKey(membro.getId())) {
				usuarios.put(membro.getId(), membro);
			}else {
				throw new Exception();
			}
		}
	}
	
	
	public void removerMembros (ArrayList<Usuario> membros) throws Exception {
		for(Usuario membro: membros) {
			if(usuarios.containsKey(membro.getId())) {
				usuarios.remove(membro.getId());
			}else {
				throw new Exception();
			}
		}
	}
	
	public void adicionarProjeto(Projeto projeto) throws Exception {
		if(!projetos.containsKey(projeto.getId())) {
			projetos.put(projeto.getId(), projeto);
		}
		throw new Exception();
	}
	
	public void removerProjeto(Projeto projeto) throws Exception {
		if(projetos.containsKey(projeto.getId())) {
			projetos.remove(projeto.getId());
		}
		throw new Exception();
	}
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	public String getNome() {
		return this.nome;
	}
}
