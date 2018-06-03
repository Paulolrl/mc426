package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Equipe {
	
	private int id;
	private String nome;
	private Gerente dono;
	private static int ultimoId = 1;
	private static HashMap<Integer, Equipe> equipePorId = new HashMap<Integer, Equipe>();
	private List<Usuario> usuarios = new ArrayList<Usuario>();
	private List<Projeto> projetos = new ArrayList<Projeto>();
	
	public Equipe(String nome, List<Usuario> usuarios, Gerente dono) throws Exception {
		this.id = proximoId();
		this.nome = nome;
		this.dono = dono;
		adicionarMembros(usuarios);
		Equipe.equipePorId.put(this.id, this);
	}
	
	public static Equipe getPorId(int id){
		return Equipe.equipePorId.get(id);
	}
	
	public void adicionarMembros(List<Usuario> membros) throws Exception {
		for(Usuario membro: membros) {
			if(!usuarios.contains(membro)) {
				usuarios.add(membro);
			}else {
				throw new Exception();
			}
		}
	}
	
	
	public void removerMembros (List<Usuario> membros) throws Exception {
		for(Usuario membro: membros) {
			if(usuarios.contains(membro)) {
				usuarios.remove(membro);
			}else {
				throw new Exception();
			}
		}
	}
	
	public void adicionarProjeto(Projeto projeto) throws Exception {
		if(!projetos.contains(projeto)) {
			projetos.add(projeto);
		}else {
			throw new Exception();
		}
	}
	
	public void removerProjeto(Projeto projeto) throws Exception {
		if(projetos.contains(projeto)) {
			this.projetos.remove(projeto);
		}else {
			throw new Exception();
		}
	}
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	public String getNome() {
		return this.nome;
	}
	
	public List<Usuario> getMembros(){
		return usuarios;
	}
	
	public List<Projeto> getProjetos(){
		return projetos;
	}
	
	public Gerente getDono() {
		return dono;
	}
}
