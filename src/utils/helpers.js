export const formatDate = (date) => {
  const createdDate = new Date(date);
  const currentDate = new Date();
  let formattedDate = "";

  const createdDateTime = createdDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (currentDate.toDateString() === createdDate.toDateString()) {
    formattedDate = `Today at ${createdDateTime}`;
  } else {
    const calcDatesDay = currentDate.getDay() - createdDate.getDay();
    if (
      (currentDate.getFullYear() === createdDate?.getFullYear(),
      currentDate.getMonth() === createdDate.getMonth(),
      calcDatesDay === 1)
    ) {
      formattedDate = `Yesterday at ${createdDateTime}`;
    } else {
      if (currentDate.getFullYear() === createdDate?.getFullYear()) {
        formattedDate = `At ${createdDate.toLocaleString("en-GB", {
          month: "long",
        })} ${createdDate.getDate()}`;
      } else {
        formattedDate = `At  ${createdDate.toLocaleString("en-GB", {
          month: "long",
        })} ${createdDate.getDate()} ${createdDate.getFullYear()}`;
      }
    }
  }

  return formattedDate;
};

export const BASE_URL = "http://localhost:3000/api/v1";
