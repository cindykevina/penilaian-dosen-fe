"use client";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { Form } from "@/types/form";
import { createForm, getForm, getPenilaian } from "@/lib/api/form";
import { FormValue } from "@/types/formValue";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Dosen } from "@/types/dosen";
import { getOneDosen } from "@/lib/api/dosen";
import { Periode } from "@/types/periode";
import { getOnePeriode } from "@/lib/api/periode";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  dosenId: number;
  periodeId: number;
  formValue: FormValue[];
};

const FormPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<Form[]>([]);
  const [formData, setFormData] = useState<FormData>({
    dosenId: 0,
    periodeId: 0,
    formValue: [],
  });
  const [dosen, setDosen] = useState<Dosen>({} as Dosen);
  const [periode, setPeriode] = useState<Periode>({} as Periode);
  const params = useParams(); // { dosenId: '123' }
  const dosenId = params.dosenId as string;
  const periodeId = params.periodeId as string;

  useEffect(() => {
    const prepareData = async () => {
      try {
        var dosen = await getOneDosen(parseInt(dosenId));
        setDosen(dosen);
        var periode = await getOnePeriode(parseInt(periodeId));
        setPeriode(periode);
        var forms = await getForm();
        setForm(forms);
        setFormData({
          ...formData,
          dosenId: parseInt(dosenId),
          periodeId: parseInt(periodeId),
        });

        const penilaian = await getPenilaian(dosen.id, periode.id)

        forms.map((e, i) => {
          e.SubKriteria?.map((el, j) => {
            var value: FormValue = { id: parseInt(el.id), nilai: penilaian.Penilaian.find((e) => e.subKriteriaId == parseInt(el.id) )?.nilai || 0 };
            setFormData((prev) => ({
              ...prev,
              formValue: [...prev.formValue, value],
            }));
          });
        });
      } catch (error) {
        console.error("error: ", error);
      }
    };
    prepareData();
  }, []);

  const handleChangeForm = (id: number, nilai: number) => {
    setFormData((prev) => ({
      ...prev,
      formValue: prev.formValue.map((item) =>
        item.id === id ? { ...item, nilai: nilai } : item
      ),
    }));
  };

  return (
    <PageContainer title="Halaman Penilaian" description="">
      <DashboardCard title="Halaman Penilaian">
        <Table sx={{ marginBottom: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "100px" }}>Dosen</TableCell>
              <TableCell>: {dosen.nama}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "100px" }}>Periode</TableCell>
              <TableCell>: {periode.periode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {form.map((e, i) => {
          return (
            <Box key={i} sx={{ marginBottom: 3 }}>
              <Typography
                fontWeight={"bold"}
                fontSize={"18px"}
                sx={{ marginBottom: 1 }}
              >
                {i + 1}. {e.nama} (Bobot: {e.bobot}%)
              </Typography>
              <Table>
                <TableBody>
                  {e.SubKriteria?.map((el, j) => {
                    return (
                      <TableRow key={j}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: 1,
                            borderColor: "text.primary",
                            width: "50px",
                          }}
                        >
                          {j + 1}.
                        </TableCell>
                        <TableCell
                          sx={{ border: 1, borderColor: "text.primary" }}
                        >
                          {el.nama}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: 1,
                            borderColor: "text.primary",
                            width: "150px",
                          }}
                        >
                          {el.nama.includes("Kuesioner") ? (
                            <CustomTextField
                              variant="outlined"
                              fullWidth
                              value={
                                formData.formValue.find(
                                  (e) => e.id == parseInt(el.id)
                                )?.nilai || 0
                              }
                              type="number"
                              size="small"
                              placeholder={`Maksimal ${el.nilaiMaksimal}`}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                if (
                                  parseFloat(e.target.value) > el.nilaiMaksimal
                                ) {
                                  alert(
                                    "nilai tidak boleh lebih dari " +
                                      el.nilaiMaksimal
                                  );
                                  e.target.value = "0";
                                  return false;
                                }
                                handleChangeForm(
                                  parseInt(el.id),
                                  parseFloat(e.target.value)
                                );
                              }}
                            />
                          ) : (
                            <Checkbox
                              checked={
                                (formData.formValue.find(
                                  (e) => e.id == parseInt(el.id)
                                )?.nilai ?? 0) > 0
                              }
                              disabled
                              onChange={(e) =>
                                handleChangeForm(
                                  parseInt(el.id),
                                  el.nilaiMaksimal
                                )
                              }
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          );
        })}
      </DashboardCard>
    </PageContainer>
  );
};

export default FormPage;
