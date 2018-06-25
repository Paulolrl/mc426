package com.mc426;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.json.JSONObject;

public class Equipe {

	private static HashMap<Integer, Equipe> equipePorId = new HashMap<Integer, Equipe>();

	private static int ultimoId = 1;

	public static Equipe getPorId(int id) {
		return Equipe.equipePorId.get(id);
	}
	
	public static Equipe getPorResource(String resource) throws InvalidParameterException{
		Pattern pattern = Pattern.compile("\\/equipes\\/(\\d+)");
		Matcher matcher = pattern.matcher(resource);
		if (matcher.find()) {
			return Equipe.getPorId(Integer.parseInt(matcher.group(1)));
		}else {
			throw new InvalidParameterException();
		}
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
		usuarios.add(dono);
		adicionarMembros(usuarios);
		Equipe.equipePorId.put(this.id, this);
	}

	public void adicionarMembros(List<Usuario> membros) throws Exception {
		for (Usuario membro : membros) {
			if (!usuarios.contains(membro)) {
				usuarios.add(membro);
				membro.incluiEquipe(this);
			} 
		}
	}

	public void adicionarProjeto(Projeto projeto) throws Exception {
		if (!projetos.contains(projeto)) {
			projetos.add(projeto);
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
		
		// TODO nunca remover dono da equipe
		for (Usuario membro : membros) {
			if (usuarios.contains(membro)) {
				usuarios.remove(membro);
				membro.excluiEquipe(this);
			} 
		}
	}

	public void removerProjeto(Projeto projeto) throws Exception {
		if (projetos.contains(projeto)) {
			this.projetos.remove(projeto);
		}
	}

	@Override
	public String toString() {
		return "{\n\tdono: \"" + "/usuarios/" + dono.getUserName() + "\",\n\tid: " + id + ",\n\tnome: \"" + nome
				+ "\",\n\tprojetos: " + projetos.stream().map(x -> "/projetos/" + x.getId()).collect(Collectors.toList())
				+ ",\n\tusuarios: "
				+ usuarios.stream().map(x -> "/usuarios/" + x.getUserName()).collect(Collectors.toList()) + "\n}";
	}

	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("nome", this.nome);
		retv.put("id", this.id);
		retv.put("dono", "/usuarios/" + this.dono.getUserName());
		retv.put("projetos", this.projetos.stream().map(x -> "/projetos/" + x.getId()).collect(Collectors.toList()));
		retv.put("membros", this.usuarios.stream().map(x -> "/usuarios/" + x.getUserName()).collect(Collectors.toList()));
		return retv;
	}
}
