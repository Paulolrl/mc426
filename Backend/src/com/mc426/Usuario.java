package com.mc426;

import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.HashMap;

public class Usuario {
	private static HashMap<String, Usuario> usuarioPorUserName = new HashMap<String, Usuario>();

	public static Usuario verifica(String usuario, String senha) {
		Usuario retv = usuarioPorUserName.get(usuario);
		if (retv.senha.equals(senha))
			return retv;
		return null;
	}

	private List<Equipe> equipes;

	private String nome;

	private String senha;
	private List<Tarefa> tarefas;
	private String userName;

	public Usuario(String userName, String senha, String nome) {
		this.userName = userName;
		this.nome = nome;
		this.senha = senha;
		this.tarefas = new ArrayList<Tarefa>();
		this.equipes = new ArrayList<Equipe>();
		Usuario.usuarioPorUserName.put(this.userName, this);
	}

	public void atribuiResponsabilidade(Tarefa tarefa) throws Exception {
		if (!tarefas.contains(tarefa)) {
			tarefas.add(tarefa);
		} else {
			throw new Exception("Tarefa ja esta atribuida ao usuario");
		}
	}

	public void excluiEquipe(Equipe equipe) throws Exception {
		if (equipes.contains(equipe)) {
			equipes.remove(equipe);
		} else {
			throw new Exception("Usuario nao pertence a equipe a ser removida");
		}
	}

	public String getNome() {
		return this.nome;
	}

	public List<Tarefa> getTarefas() {
		return tarefas;
	}

	public String getUserName() {
		return this.userName;
	}

	public void incluiEquipe(Equipe equipe) throws Exception {
		if (!equipes.contains(equipe)) {
			equipes.add(equipe);
		} else {
			throw new Exception("Usuario ja pertence a equipe");
		}
	}

	public void removerResponsabilidade(Tarefa tarefa) throws Exception {
		if (tarefas.contains(tarefa)) {
			tarefas.remove(tarefa);
		} else {
			throw new Exception("Usuario nao e responsavel pela tarefa a ser removida");
		}
	}

	@Override
	public String toString() {
		return "{\n\tnome: " + nome + "\n\ttarefas: "
				+ tarefas.stream().map(x -> "/projetos/" + x.getProjeto().getId() + "/tarefas/" + x.getId())
						.collect(Collectors.toList())
				+ "\n\tequipes: " + equipes.stream().map(x -> "/equipes/" + x.getId()).collect(Collectors.toList())
				+ "\n\tuserName: " + userName + "\n}";
	}
}
