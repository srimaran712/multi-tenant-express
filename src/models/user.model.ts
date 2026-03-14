import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Tenant } from "./tenant.model"
import { Project } from "./project.model"

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

//entity for the user model
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({nullable: false})
    name!: string
    
    @Column({unique: true})
    email!: string
    
    @Column({nullable: false})
    password!: string

    @Column({nullable: false})
    role!: UserRole

    @Column({nullable:false, default: false})
    isVerified!: boolean

    @Column({nullable:true})
    otp!: number

    @Column({nullable:true})
    otpExpires!: Date
    
    @ManyToOne(() => Tenant, (tenant) => tenant.users)
    tenant!: Tenant
    
    @Column({nullable: false})
    tenantId!: number

    @OneToMany(() => Project, (project) => project.createdBy)
    projects!: Project[]
}
