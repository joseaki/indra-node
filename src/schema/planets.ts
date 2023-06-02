import { Planeta } from "src/types/planet.types";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PlanetSchema implements Planeta {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("bigint", { nullable: true, name: "idExterno", unique: true })
  idExterno: number;
  @Column("text", { nullable: true, name: "nombre" })
  nombre: string;
  @Column("text", { nullable: true, name: "periodo_rotacion" })
  periodo_rotacion: string;
  @Column("text", { nullable: true, name: "periodo_orbita" })
  periodo_orbita: string;
  @Column("text", { nullable: true, name: "diametro" })
  diametro: string;
  @Column("text", { nullable: true, name: "clima" })
  clima: string;
  @Column("text", { nullable: true, name: "gravedad" })
  gravedad: string;
  @Column("text", { nullable: true, name: "terreno" })
  terreno: string;
  @Column("text", { nullable: true, name: "superficie_agua" })
  superficie_agua: string;
  @Column("text", { nullable: true, name: "poblacion" })
  poblacion: string;
  @Column("simple-array", { nullable: true, name: "residentes" })
  residentes: string[];
  @Column("simple-array", { nullable: true, name: "peliculas" })
  peliculas: string[];
  @Column("timestamp", { nullable: true, name: "creado" })
  creado: Date;
  @Column("timestamp", { nullable: true, name: "editado" })
  editado: Date;
  @Column("text", { nullable: true, name: "url" })
  url: string;
}
