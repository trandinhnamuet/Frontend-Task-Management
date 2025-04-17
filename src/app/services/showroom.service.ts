import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Showroom } from '../models/showroom.model';

@Injectable({
  providedIn: 'root',
})
export class ShowroomService {
  private apiUrl = 'http://localhost:5283/api/Showroom';

  constructor(private http: HttpClient) {}

  getShowrooms(): Observable<Showroom[]> {
    return this.http.get<Showroom[]>(this.apiUrl);
  }

  getShowroomById(id: number): Observable<Showroom> {
    return this.http.get<Showroom>(`${this.apiUrl}/${id}`);
  }

  createShowroom(showroom: Showroom): Observable<Showroom> {
    return this.http.post<Showroom>(this.apiUrl, showroom);
  }

  updateShowroom(id: number, showroom: Showroom): Observable<Showroom> {
    return this.http.put<Showroom>(`${this.apiUrl}/${id}`, showroom);
  }

  deleteShowroom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
