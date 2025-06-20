import { Kriteria } from "./kriteria";

export interface SubKriteria {
  id: string;
  nama: string;
  kriteriaId: number;
  kriteria: Kriteria
  nilaiMaksimal: number;
}
