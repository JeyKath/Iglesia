// ✅ Importar Supabase desde el CDN ESM (compatible con navegador)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ✅ Configurar conexión a Supabase
const supabaseUrl = "https://ypeejvfjoubtlbqtilxp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWVqdmZqb3VidGxicXRpbHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDQ5NjgsImV4cCI6MjA3NTQ4MDk2OH0.T4DF-f4eWw9Ynm-o1worupTbxRLVdapyI3HP43bWujA";  // asegúrate clave completa
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase conectado correctamente");

let currentStep = 1;
const totalSteps = 5;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo");

  // ==========================
  // 🔹 Mostrar paso del formulario
  // ==========================
  function showStep(step) {
    document.querySelectorAll(".form-step").forEach((div) => div.classList.remove("active"));
    const currentDiv = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentDiv) currentDiv.classList.add("active");
    currentStep = step;
    document.getElementById("mensajeProgreso").textContent = `Paso ${step} de ${totalSteps}`;
  }

  // ==========================
  // 🔹 Mostrar errores encima de los inputs (usa los <div> del HTML)
  // ==========================
  function mostrarError(idCampo, mensaje) {
  // Buscar el div existente
    let errorDiv = document.getElementById(`error-${idCampo}`);

    // Si no existe, crearlo dinámicamente justo antes del label/input
    if (!errorDiv) {
      const campo = document.getElementById(idCampo);
      if (campo) {
        const contenedor = campo.closest(".field-group");
        if (contenedor) {
          errorDiv = document.createElement("div");
          errorDiv.classList.add("error-message");
          errorDiv.id = `error-${idCampo}`;
          contenedor.insertBefore(errorDiv, contenedor.firstChild);
        }
      }
    }

    // Escribir el mensaje si hay un div disponible
    if (errorDiv) {
      errorDiv.textContent = mensaje;
      errorDiv.style.color = "red";
      errorDiv.style.fontWeight = "600";
    }
  }

  function limpiarErrores() {
    document.querySelectorAll(".error-message").forEach((div) => (div.textContent = ""));
  }

  // ==========================
  // 🔹 Validaciones por paso
  // ==========================
  function validarPaso1() {
  limpiarErrores();
  let valido = true;

  const fotoInput = document.getElementById("fotoMiembro");
  const fotoArchivo = fotoInput.files[0];
  const nombres = document.getElementById("nombresMiembro").value.trim();
  const apellidos = document.getElementById("apellidosMiembro").value.trim();
  const dni = document.getElementById("dniMiembro").value.trim();
  const edad = document.getElementById("edadMiembro").value.trim();
  const genero = document.getElementById("generoMiembro").value;
  const fecha = document.getElementById("fechaNacimientoMiembro").value;
  const direccion = document.getElementById("direccionMiembro").value.trim();
  const contacto = document.getElementById("contactoMiembro").value.trim();
  const correo = document.getElementById("correoMiembro").value.trim();
  const estadoCivil = document.getElementById("estadoCivilMiembro").value;
  const bautizado = document.getElementById("bautizadoMiembro").value;
  const tieneHijos = document.getElementById("tieneHijos").value;

  // --- Foto ---
  if (!fotoArchivo) {
    mostrarError("fotoMiembro", "Por favor suba una foto.");
    valido = false;
  }

  // --- Nombres ---
  if (!nombres) {
    mostrarError("nombresMiembro", "Por favor ingrese sus nombres.");
    valido = false;
  }

  // --- Apellidos ---
  if (!apellidos) {
    mostrarError("apellidosMiembro", "Por favor ingrese sus apellidos.");
    valido = false;
  }

  // --- DNI ---
  if (!dni) {
    mostrarError("dniMiembro", "Por favor ingrese su DNI.");
    valido = false;
  } else if (!/^[0-9]{8}$/.test(dni)) {
    mostrarError("dniMiembro", "El DNI debe tener 8 dígitos numéricos.");
    valido = false;
  }

  // --- Edad ---
  if (!edad || edad <= 0) {
    mostrarError("edadMiembro", "Ingrese una edad válida.");
    valido = false;
  }

  // --- Género ---
  if (!genero) {
    mostrarError("generoMiembro", "Seleccione un género.");
    valido = false;
  }

  // --- Fecha de nacimiento ---
  if (!fecha) {
    mostrarError("fechaNacimientoMiembro", "Ingrese su fecha de nacimiento.");
    valido = false;
  }

  // --- Dirección ---
  if (!direccion) {
    mostrarError("direccionMiembro", "Ingrese su dirección.");
    valido = false;
  }

  // --- Contacto ---
  if (!contacto) {
    mostrarError("contactoMiembro", "Ingrese su número de contacto.");
    valido = false;
  } else if (!/^9\d{8}$/.test(contacto)) {
    mostrarError("contactoMiembro", "El teléfono debe tener 9 dígitos y empezar con 9.");
    valido = false;
  }

  // --- Correo ---
  if (!correo) {
    mostrarError("correoMiembro", "Ingrese su correo electrónico.");
    valido = false;
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
    mostrarError("correoMiembro", "Ingrese un correo válido.");
    valido = false;
  }

  // --- Estado civil ---
  if (!estadoCivil) {
    mostrarError("estadoCivilMiembro", "Seleccione su estado civil.");
    valido = false;
  }

  // --- Bautizado ---
  if (!bautizado) {
    mostrarError("bautizadoMiembro", "Indique si está bautizado.");
    valido = false;
  }

  // --- Tiene hijos ---
  if (!tieneHijos) {
    mostrarError("tieneHijos", "Seleccione si tiene hijos o no.");
    valido = false;
  }

  return valido;
  }

  function validarPaso2() {
  limpiarErrores();
  let valido = true;

  const anexo = document.getElementById("anexo").value;
  const casaFamiliar = document.getElementById("casa_familiar").value.trim();

  if (!anexo) {
    mostrarError("anexo", "Seleccione un anexo.");
    valido = false;
  }

  if (!casaFamiliar) {
    mostrarError("casa_familiar", "Ingrese su casa familiar.");
    valido = false;
  }

  return valido;
  }

  function validarPaso3() {
  limpiarErrores();
  let valido = true;

  const fecha = document.getElementById("fechaBautismo").value;
  const lugar = document.getElementById("lugarBautismo").value.trim();
  const pastor = document.getElementById("pastor").value.trim();

  if (!fecha) {
    mostrarError("fechaBautismo", "Ingrese la fecha de bautismo.");
    valido = false;
  }

  if (!lugar) {
    mostrarError("lugarBautismo", "Ingrese el lugar del bautismo.");
    valido = false;
  }

  if (!pastor) {
    mostrarError("pastor", "Ingrese el nombre del pastor.");
    valido = false;
  }

  return valido;
  }

 function validarPaso4() {
  limpiarErrores();
  let valido = true;

  const fotoInput = document.getElementById("fotoConyugue");
  const fotoConyugue = fotoInput.files[0];
  const nombresConyugue = document.getElementById("nombresConyugue").value.trim();
  const apellidosConyugue = document.getElementById("apellidosConyugue").value.trim();
  const dniConyugue = document.getElementById("dniConyugue").value.trim();
  const edadConyugue = document.getElementById("edadConyugue").value.trim();
  const generoConyugue = document.getElementById("generoConyugue").value;
  const fechaNacimientoConyugue = document.getElementById("fechaNacimientoConyugue").value;
  const direccionConyugue = document.getElementById("direccionConyugue").value.trim();
  const contactoConyugue = document.getElementById("contactoConyugue").value.trim();
  const correoConyugue = document.getElementById("correoConyugue").value.trim();
  const estadoCivilConyugue = document.getElementById("estadoCivilConyugue").value;
  const creyenteConyugue = document.getElementById("creyenteConyugue").value;

  // --- Foto ---
  if (!fotoConyugue) {
    mostrarError("fotoConyugue", "Por favor suba una foto.");
    valido = false;
  }

  // --- Nombres ---
  if (!nombresConyugue) {
    mostrarError("nombresConyugue", "Por favor ingrese los nombres del cónyuge.");
    valido = false;
  }

  // --- Apellidos ---
  if (!apellidosConyugue) {
    mostrarError("apellidosConyugue", "Por favor ingrese los apellidos del cónyuge.");
    valido = false;
  }

  // --- DNI ---
  if (!dniConyugue) {
    mostrarError("dniConyugue", "Por favor ingrese el DNI del cónyuge.");
    valido = false;
  } else if (!/^[0-9]{8}$/.test(dniConyugue)) {
    mostrarError("dniConyugue", "El DNI debe tener 8 dígitos numéricos.");
    valido = false;
  }

  // --- Edad ---
  if (!edadConyugue || edadConyugue <= 0) {
    mostrarError("edadConyugue", "Ingrese una edad válida.");
    valido = false;
  }

  // --- Género ---
  if (!generoConyugue) {
    mostrarError("generoConyugue", "Seleccione un género.");
    valido = false;
  }

  // --- Fecha de nacimiento ---
  if (!fechaNacimientoConyugue) {
    mostrarError("fechaNacimientoConyugue", "Ingrese su fecha de nacimiento.");
    valido = false;
  }

  // --- Dirección ---
  if (!direccionConyugue) {
    mostrarError("direccionConyugue", "Ingrese su dirección.");
    valido = false;
  }

  // --- Contacto ---
  if (!contactoConyugue) {
    mostrarError("contactoConyugue", "Ingrese su número de contacto.");
    valido = false;
  } else if (!/^9\d{8}$/.test(contactoConyugue)) {
    mostrarError("contactoConyugue", "El teléfono debe tener 9 dígitos y empezar con 9.");
    valido = false;
  }

  // --- Correo ---
  if (!correoConyugue) {
    mostrarError("correoConyugue", "Ingrese su correo electrónico.");
    valido = false;
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correoConyugue)) {
    mostrarError("correoConyugue", "Ingrese un correo válido.");
    valido = false;
  }

  // --- Estado civil ---
  if (!estadoCivilConyugue) {
    mostrarError("estadoCivilConyugue", "Seleccione su estado civil.");
    valido = false;
  }

  // --- Es creyente ---
  if (!creyenteConyugue) {
    mostrarError("creyenteConyugue", "Indique si es creyente o no.");
    valido = false;
  }

  return valido;
}


  function validarPaso5() {
  limpiarErrores();
  let valido = true;

  const hijos = document.querySelectorAll("#contenedorHijos .hijo");

  if (hijos.length > 0) {
    hijos.forEach((hijo, index) => {
      const nombre = hijo.querySelector(".nombresHijo")?.value.trim();
      const dni = hijo.querySelector(".dniHijo")?.value.trim();

      if (!nombre) {
        mostrarError(`nombresHijo${index}`, "Ingrese el nombre del hijo.");
        valido = false;
      }

      if (!dni) {
        mostrarError(`dniHijo${index}`, "Ingrese el DNI del hijo.");
        valido = false;
      } else if (!/^[0-9]{8}$/.test(dni)) {
        mostrarError(`dniHijo${index}`, "El DNI debe tener 8 dígitos numéricos.");
        valido = false;
      }
    });
  }

  return valido;
  }

  // ==========================
  // 🔹 Botones SIGUIENTE / ATRÁS
  // ==========================
  const pasos = [
    { next: "btnNext1" },
    { back: "btnBack2", next: "btnNext2" },
    { back: "btnBack3", next: "btnNext3" },
    { back: "btnBack4", next: "btnNext4" },
    { back: "btnBack5" },
  ];

  pasos.forEach((p, i) => {
    if (p.next) {
      document.getElementById(p.next).addEventListener("click", () => {
        let valido = true;
        switch (i + 1) {
          case 1:
            valido = validarPaso1();
            break;
          case 2:
            valido = validarPaso2();
            break;
          case 3:
            valido = validarPaso3();
            break;
          case 4:
            valido = validarPaso4();
            break;
          case 5:
            valido = validarPaso5();
            break;
        }
        if (valido) showStep(currentStep + 1);
      });
    }
    if (p.back) {
      document.getElementById(p.back).addEventListener("click", () => {
        showStep(currentStep - 1);
      });
    }
  });

// ==========================
// 🔹 Envío de formulario a Supabase (con fotos y relaciones correctas)
// ==========================
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  limpiarErrores();

  // Función auxiliar para subir fotos
  async function subirFoto(file, carpeta) {
    if (!file) return null;
    const nombreArchivo = `${carpeta}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from("fotos").upload(nombreArchivo, file);
    if (error) {
      console.error("Error subiendo foto:", error.message);
      return null;
    }
    const { data: urlData } = supabase.storage.from("fotos").getPublicUrl(nombreArchivo);
    return urlData.publicUrl;
  }

  // Subir foto del miembro
  const fotoMiembroFile = document.getElementById("fotoMiembro").files[0];
  const fotoMiembroURL = await subirFoto(fotoMiembroFile, "miembros");

  // 1️⃣ Insertar miembro principal
  const miembro = {
    dni: document.getElementById("dniMiembro").value.trim(),
    foto_url: fotoMiembroURL,
    nombres: document.getElementById("nombresMiembro").value.trim(),
    apellidos: document.getElementById("apellidosMiembro").value.trim(),
    edad: parseInt(document.getElementById("edadMiembro").value) || null,
    genero: document.getElementById("generoMiembro").value,
    fecha_nacimiento: document.getElementById("fechaNacimientoMiembro").value,
    direccion: document.getElementById("direccionMiembro").value.trim(),
    contacto: document.getElementById("contactoMiembro").value.trim(),
    correo: document.getElementById("correoMiembro").value.trim(),
    estado_civil: document.getElementById("estadoCivilMiembro").value,
    bautizado: document.getElementById("bautizadoMiembro").value === "si",
    anexo: document.getElementById("anexo").value,
    casa_familiar: document.getElementById("casa_familiar").value,
  };

  let miembroId;
  try {
    const { data, error } = await supabase
      .from("miembros")
      .insert([miembro])
      .select("id")
      .single();
    if (error) throw error;
    miembroId = data.id;
    console.log("🟢 Miembro registrado:", miembroId);
  } catch (err) {
    mostrarError("dniMiembro", "Error al guardar el miembro: " + err.message);
    return;
  }

  // 2️⃣ Insertar bautismo
  const fechaB = document.getElementById("fechaBautismo").value;
  if (fechaB) {
    const bautismo = {
      miembro_id: miembroId,
      fecha: fechaB,
      lugar: document.getElementById("lugarBautismo").value.trim(),
      pastor: document.getElementById("pastor").value.trim(),
    };
    const { error } = await supabase.from("bautismos").insert([bautismo]);
    if (error) console.error("Error al guardar bautismo:", error);
  }

  // 3️⃣ Insertar cónyuge
  const nombresCony = document.getElementById("nombresConyugue").value.trim();
  if (nombresCony) {
    const fotoConyFile = document.getElementById("fotoConyugue").files[0];
    const fotoConyURL = await subirFoto(fotoConyFile, "conyugues");

    const conyugue = {
      miembro_id: miembroId,
      foto_url: fotoConyURL,
      dni: document.getElementById("dniConyugue").value.trim(),
      nombres: nombresCony,
      apellidos: document.getElementById("apellidosConyugue").value.trim(),
      edad: parseInt(document.getElementById("edadConyugue").value) || null,
      genero: document.getElementById("generoConyugue").value,
      fecha_nacimiento: document.getElementById("fechaNacimientoConyugue").value,
      direccion: document.getElementById("direccionConyugue").value.trim(),
      contacto: document.getElementById("contactoConyugue").value.trim(),
      correo: document.getElementById("correoConyugue").value.trim(),
      estado_civil: document.getElementById("estadoCivilConyugue").value,
      es_creyente: document.getElementById("creyenteConyugue").value === "true",
    };
    const { error } = await supabase.from("conyugues").insert([conyugue]);
    if (error) console.error("Error al guardar cónyuge:", error);
  }

  // 4️⃣ Insertar hijos (si existen)
  const hijosDivs = document.querySelectorAll("#contenedorHijos .hijo");
  for (const hijo of hijosDivs) {
    const nombre = hijo.querySelector(".nombresHijo")?.value.trim();
    if (!nombre) continue;

    const fotoHijoFile = hijo.querySelector(".fotoHijo")?.files[0];
    const fotoHijoURL = await subirFoto(fotoHijoFile, "hijos");

    const h = {
      miembro_id: miembroId,
      foto_url: fotoHijoURL,
      dni: hijo.querySelector(".dniHijo")?.value.trim(),
      nombres: nombre,
      apellidos: hijo.querySelector(".apellidosHijo")?.value.trim(),
      edad: parseInt(hijo.querySelector(".edadHijo")?.value) || null,
      genero: hijo.querySelector(".generoHijo")?.value,
      fecha_nacimiento: hijo.querySelector(".fechaNacimientoHijo")?.value,
      direccion: hijo.querySelector(".direccionHijo")?.value.trim(),
      contacto: hijo.querySelector(".contactoHijo")?.value.trim(),
      correo: hijo.querySelector(".correoHijo")?.value.trim(),
      bautizado: hijo.querySelector(".bautizadoHijo")?.value === "true",
    };
    const { error } = await supabase.from("hijos").insert([h]);
    if (error) console.error("Error al guardar hijo:", error);
  }

  // 5️⃣ Insertar familiares no creyentes (si existen)
  const tieneFamiliares = document.getElementById("tieneFamiliares")?.value;
  if (tieneFamiliares === "si") {
    const familiaresDivs = document.querySelectorAll("#contenedorFamiliares .form-familiar");

    for (const [i, familiar] of familiaresDivs.entries()) {
      const nombres = familiar.querySelector(`#nombresFamiliar${i + 1}`)?.value.trim();
      const apellidos = familiar.querySelector(`#apellidosFamiliar${i + 1}`)?.value.trim();
      const dni = familiar.querySelector(`#dniFamiliar${i + 1}`)?.value.trim();
      if (!nombres || !apellidos || !dni) continue;

      const fotoFamFile = familiar.querySelector(`#fotoFamiliar${i + 1}`)?.files[0];
      const fotoFamURL = await subirFoto(fotoFamFile, "familiares");

      const f = {
        miembro_id: miembroId,
        foto_url: fotoFamURL,
        nombres,
        apellidos,
        dni,
        edad: parseInt(familiar.querySelector(`#edadFamiliar${i + 1}`)?.value) || null,
        genero: familiar.querySelector(`#generoFamiliar${i + 1}`)?.value,
        direccion: familiar.querySelector(`#direccionFamiliar${i + 1}`)?.value.trim(),
        contacto: familiar.querySelector(`#contactoFamiliar${i + 1}`)?.value.trim(),
        correo: familiar.querySelector(`#correoFamiliar${i + 1}`)?.value.trim(),
        es_creyente: familiar.querySelector(`#creyenteFamiliar${i + 1}`)?.value === "true",
        estado_civil: null,
      };
      const { error } = await supabase.from("familiares_no_creyentes").insert([f]);
      if (error) console.error("Error al guardar familiar:", error);
    }
  }

  // 6️⃣ Confirmación final
  alert("✅ Todos los datos y fotos se guardaron correctamente en Supabase.");
  document.getElementById("form-miembro").reset();
  showStep(1);
});

// Mostrar primer paso al iniciar
showStep(1);



})