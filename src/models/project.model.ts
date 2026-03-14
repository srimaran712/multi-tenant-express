import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tenant } from "./tenant.model";
import { User } from "./user.model";

export enum ProjectStatus{
    NOTSTARTED = "not_started",
    INPROGRESS = "in_progress",
    COMPLETED = "completed"
}

@Entity("projects")
export class Project {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    status!: ProjectStatus

    @Column()
    createdAt!: Date


    @Column()
    updatedAt!: Date

    
    @ManyToOne(() => Tenant, (tenant) => tenant.projects)
    tenant!: Tenant

    @Column({nullable: false})
    tenantId!: number

    @ManyToOne(() => User, (user) => user.projects)
    createdBy!: User

    @Column()
    createdById!: number


    
  
}
