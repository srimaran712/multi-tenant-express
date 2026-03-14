import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.model";
import { Project } from "./project.model";

@Entity("tenants")
export class Tenant {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({nullable: false,unique: true})
    name!: string
    
  @OneToMany(() => User, (user) => user.tenant)
  users!: User[];

  // Relation: One tenant can have many projects
  @OneToMany(() => Project, (project) => project.tenant)
  projects!: Project[];
}