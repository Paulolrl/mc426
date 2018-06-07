package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;

public class Equipe {

	private static HashMap<Integer, Equipe> equipePorId = new HashMap<Integer, Equipe>();

	private static int ultimoId = 1;

	public static Equipe getPorId(int id) {
		return Equipe.equipePorId.get(id);
	}

	private static int proximoId() {
		return ultimoId++;
	}

	private Gerente dono;

	private int id;
	private String nome;

	private List<Projeto> projetos;
	private List<Usuario> usuarios;

	public Equipe(String nome, List<Usuario> usuarios, Gerente dono) throws Exception {
		this.id = proximoId();
		this.nome = nome;
		this.dono = dono;
		this.projetos = new ArrayList<Projeto>();
		this.usuarios = new ArrayList<Usuario>();
		adicionarMembros(usuarios);
		Equipe.equipePorId.put(this.id, this);
	}

	public void adicionarMembros(List<Usuario> membros) throws Exception {
		for (Usuario membro : membros) {
			if (!usuarios.contains(membro)) {
				usuarios.add(membro);
				membro.incluiEquipe(this);
			} else {
				throw new Exception("Usuario ja esta na equipe");
			}
		}
	}

	public void adicionarProjeto(Projeto projeto) throws Exception {
		if (!projetos.contains(projeto)) {
			projetos.add(projeto);
		} else {
			throw new Exception("Projeto a ser adicionado ja esta na lista de projetos");
		}
	}

	public Gerente getDono() {
		return dono;
	}

	public int getId() {
		return id;
	}

	public List<Usuario> getMembros() {
		return usuarios;
	}

	public String getNome() {
		return this.nome;
	}

	public List<Projeto> getProjetos() {
		return projetos;
	}

	public void removerMembros(List<Usuario> membros) throws Exception {
		for (Usuario membro : membros) {
			if (usuarios.contains(membro)) {
				usuarios.remove(membro);
				membro.excluiEquipe(this);
			} else {
				throw new Exception("Usuario a ser removido nao esta na equipe");
			}
		}
	}

	public void removerProjeto(Projeto projeto) throws Exception {
		if (projetos.contains(projeto)) {
			this.projetos.remove(projeto);
		} else {
			throw new Exception("projeto a ser removido nao esta na lista de projetos");
		}
	}

	@Override
	public String toString() {
		return "{\n\tdono: \"" + "/usuarios/" + dono.getUserName() + "\",\n\tid: " + id + ",\n\tnome: \"" + nome
				+ "\",\n\tprojetos: " + projetos.stream().map(x -> "/projetos/" + x.getId()).collect(Collectors.toList())
				+ ",\n\tusuarios: "
				+ usuarios.stream().map(x -> "/usuarios/" + x.getUserName()).collect(Collectors.toList()) + "\n}";
	}
}
