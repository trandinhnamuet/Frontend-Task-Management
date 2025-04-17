import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  newRole: Role = { roleID: 0, roleName: '' };
  selectedRole: Role | null = null;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(
      (data) => {
        console.log('✅ API Response:', data); // Kiểm tra dữ liệu nhận được từ API
        this.roles = data;
      },
      (error) => console.error('❌ API Error:', error)
    );
  }
  

  addRole(): void {
    if (this.newRole.roleName.trim()) {
      this.roleService.createRole(this.newRole).subscribe(() => {
        this.loadRoles();
        this.newRole = { roleID: 0, roleName: '' };
      });
    }
  }

  editRole(role: Role): void {
    this.selectedRole = { ...role }; // Sao chép dữ liệu Role vào selectedRole
  }
  
  updateRole(): void {
    if (this.selectedRole) {
      this.roleService.updateRole(this.selectedRole.roleID, this.selectedRole).subscribe(() => {
        this.loadRoles();
        this.selectedRole = null; // Reset form sau khi cập nhật
      });
    }
  }

  
  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
  }
}
