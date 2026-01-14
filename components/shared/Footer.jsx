const Footer = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-20">
        <h3 className="text-[20rem] -ml-20 overflow-hidden whitespace-nowrap text-white uppercase">
          Mezanur Rahman
        </h3>
      </div>
      <div>
        <p className="text-white text-xs text-center pb-8 border-t border-white/20 pt-7 uppercase">
          Designed by <strong>Mezanur Rahman</strong> Copyright &copy;{" "}
          {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
