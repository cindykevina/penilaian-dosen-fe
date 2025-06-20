import { Homebase } from "./homebase";

export interface PenilaianDosen {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  homebase: Homebase;
  homebaseId: string;
  Report?: Report[];
  sum: {
    id: number;
    nama: string;
    bobot: number;
    total_point: number;
    jumlah: number;
    normalisasi: number;
  };
}
