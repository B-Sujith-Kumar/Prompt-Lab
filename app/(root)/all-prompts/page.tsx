import AllPrompts from "@/components/shared/Prompts/AllPrompts";
import Card from "@/components/shared/Prompts/Card";
import { getAllPrompts, getPrompts } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    return (
        <AllPrompts userId={userId}/>
    )
};

export default Page;
